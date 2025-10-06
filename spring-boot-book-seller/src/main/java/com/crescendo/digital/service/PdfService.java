package com.crescendo.digital.service;

import com.crescendo.digital.model.Book;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PdfService {

    public ByteArrayInputStream generateBookReport(List<Book> books) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // Adicionar Cabeçalho
        // (Assumindo que a imagem do logo está em src/main/resources/images/logo.png)
        try {
            InputStream logoStream = getClass().getClassLoader().getResourceAsStream("images/logo.png");
            if (logoStream != null) {
                byte[] logoBytes = logoStream.readAllBytes();
                Image logo = new Image(ImageDataFactory.create(logoBytes)).scaleToFit(50, 50);
                document.add(logo);
            }
        } catch (Exception e) {
            // Log ou trata o erro se o logo não for encontrado, mas não quebra a geração
            System.err.println("Logo image not found or could not be loaded.");
        }

        Paragraph title = new Paragraph("Relatório de Livros - RivaBook")
                .setTextAlignment(TextAlignment.CENTER)
                .setBold()
                .setFontSize(20);
        document.add(title);

        // Adicionar Tabela
        float[] columnWidths = {1, 4, 3, 2, 2, 3};
        Table table = new Table(UnitValue.createPercentArray(columnWidths));
        table.setWidth(UnitValue.createPercentValue(100));

        // Cabeçalhos da Tabela
        table.addHeaderCell(new Cell().add(new Paragraph("Código").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Título").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Autor").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Preço").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Desconto").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Data").setBold()));

        // Dados da Tabela
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        for (Book book : books) {
            table.addCell(new Cell().add(new Paragraph(book.getId().toString())));
            table.addCell(new Cell().add(new Paragraph(book.getTitle())));
            table.addCell(new Cell().add(new Paragraph(book.getAuthor())));
            table.addCell(new Cell().add(new Paragraph(String.format("R$ %.2f", book.getPrice()))));
            table.addCell(new Cell().add(new Paragraph(String.format("R$ %.2f", book.getDiscount_price()))));
            table.addCell(new Cell().add(new Paragraph(book.getCreateTime().format(formatter))));
        }

        document.add(table);
        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
