import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { DashboardService, DashboardStatistics, PurchaseHistoryDetail } from '../../services/dashboard.service';

// Interface para os dados que vamos CALCULAR aqui no frontend
interface BestSeller {
  title: string;
  unitsSold: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Propriedades para os dados
  statistics: DashboardStatistics = { total_pedidos: 0, total_vendas: 0 };
  bestSellers: BestSeller[] = [];
  loading = true;
  error: string | null = null;

  private barChart: Chart | undefined;
  private pieChart: Chart | undefined; // Propriedade para o novo gráfico
  private subscriptions: Subscription[] = [];

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDataInSequence();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.barChart?.destroy();
    this.pieChart?.destroy(); // Destrói o novo gráfico também
  }

  loadDataInSequence(): void {
    this.loading = true;
    this.error = null;

    const statsSub = this.dashboardService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;

        const historySub = this.dashboardService.getPurchaseHistoryDetails().subscribe({
          next: (history) => {
            this.calculateBestSellers(history);

            // Cria os dois gráficos
            this.createBestSellersBarChart(this.bestSellers);
            this.createDistributionPieChart(this.bestSellers);

            this.loading = false;
          },
          error: (err) => {
            this.error = 'As estatísticas foram carregadas, mas o histórico de vendas falhou.';
            this.loading = false;
          }
        });
        this.subscriptions.push(historySub);
      },
      error: (err) => {
        this.error = 'Não foi possível carregar os totais de vendas e pedidos.';
        this.loading = false;
      }
    });
    this.subscriptions.push(statsSub);
  }

  calculateBestSellers(history: PurchaseHistoryDetail[]): void {
    const bookCounts = new Map<string, number>();
    history.forEach(item => {
      bookCounts.set(item.title, (bookCounts.get(item.title) || 0) + 1);
    });
    this.bestSellers = Array.from(bookCounts.entries())
      .map(([title, unitsSold]) => ({ title, unitsSold }))
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 10);
  }

  createBestSellersBarChart(bestSellers: BestSeller[]): void {
    if (this.barChart) { this.barChart.destroy(); }

    this.barChart = new Chart('salesChart', {
      type: 'bar',
      data: { labels: bestSellers.map(b => b.title), datasets: [{ label: 'Unidades Vendidas', data: bestSellers.map(b => b.unitsSold), backgroundColor: 'rgba(52, 152, 219, 0.7)' }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
  }

  // NOVA FUNÇÃO para criar o gráfico de pizza
  createDistributionPieChart(bestSellers: BestSeller[]): void {
    if (this.pieChart) { this.pieChart.destroy(); }

    const top5 = bestSellers.slice(0, 5);

    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: top5.map(b => b.title),
        datasets: [{
          label: 'Distribuição de Vendas',
          data: top5.map(b => b.unitsSold),
          backgroundColor: [
            'rgba(52, 152, 219, 0.8)',
            'rgba(46, 204, 113, 0.8)',
            'rgba(241, 196, 15, 0.8)',
            'rgba(230, 126, 34, 0.8)',
            'rgba(231, 76, 60, 0.8)'
          ],
          hoverOffset: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
