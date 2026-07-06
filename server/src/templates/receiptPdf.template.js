import formatCurrency from "../utils/formatCurrency.js";
import formatDate from "../utils/date.js";

const PAGE = {
    WIDTH: 595.28,
    HEIGHT: 841.89,
    MARGIN_X: 38,
    MARGIN_TOP: 28,
    MARGIN_BOTTOM: 30,
    CONTENT_WIDTH: 519.28,
};

const SPACING = {
    XS: 4,
    SM: 8,
    MD: 10,
    LG: 12,
    XL: 18,
    XXL: 24,
};

const CARD = {
    RADIUS: 12,
    PADDING_X: 16,
    PADDING_Y: 12,
};

const FOOTER = {
    HEIGHT: 84,
    GAP: 6,
};

const COLORS = {
    PRIMARY: "#2563EB",
    PRIMARY_LIGHT: "#EFF6FF",
    PRIMARY_BORDER: "#BFDBFE",

    SUCCESS: "#16A34A",
    SUCCESS_BG: "#DCFCE7",

    TEXT: "#0F172A",
    MUTED: "#64748B",

    BORDER: "#E2E8F0",
    BACKGROUND: "#F8FAFC",

    WHITE: "#FFFFFF",
};

let cursorY = PAGE.MARGIN_TOP;

const moveCursor = (value) => {
    cursorY += value;
    return cursorY;
};

const sectionGap = () => moveCursor(SPACING.LG);

const dividerGap = () => moveCursor(SPACING.MD);

const drawDivider = (doc) => {
    doc
        .save()
        .strokeColor(COLORS.BORDER)
        .lineWidth(1)
        .moveTo(
            PAGE.MARGIN_X,
            cursorY
        )
        .lineTo(
            PAGE.WIDTH - PAGE.MARGIN_X,
            cursorY
        )
        .stroke()
        .restore();

    dividerGap();
};

const drawSectionTitle = (
    doc,
    title
) => {
    doc
        .fillColor("#334155")
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(
            title.toUpperCase(),
            PAGE.MARGIN_X,
            cursorY,
            {
                characterSpacing: 1.2,
            }
        );

    moveCursor(16);
};

const drawCard = (
    doc,
    {
        x = PAGE.MARGIN_X,
        y = cursorY,
        width = PAGE.CONTENT_WIDTH,
        height,
        fill = COLORS.WHITE,
        border = COLORS.BORDER,
    }
) => {
    doc
        .save()
        .roundedRect(
            x,
            y,
            width,
            height,
            CARD.RADIUS
        )
        .fillAndStroke(
            fill,
            border
        )
        .restore();

    return {
        x:
            x +
            CARD.PADDING_X,
        y:
            y +
            CARD.PADDING_Y,
        width:
            width -
            CARD.PADDING_X *
                2,
        height:
            height -
            CARD.PADDING_Y *
                2,
    };
};

const drawLabel = (
    doc,
    label,
    x,
    y
) => {
    doc
        .fillColor(COLORS.MUTED)
        .font("Helvetica")
        .fontSize(8.5)
        .text(
            label,
            x,
            y
        );
};

const drawValue = (
    doc,
    value,
    x,
    y,
    width = 150
) => {
    doc
        .fillColor(COLORS.TEXT)
        .font("Helvetica-Bold")
        .fontSize(10.5)
        .text(
            value || "-",
            x,
            y,
            {
                width,
                ellipsis: true,
            }
        );
};

const drawInfoRow = (
    doc,
    {
        label,
        value,
        x,
        y,
        width = 150,
    }
) => {
    drawLabel(
        doc,
        label,
        x,
        y
    );

    drawValue(
        doc,
        value,
        x,
        y + 12,
        width
    );
};

const drawHeader = (doc, invoice) => {
    const headerHeight = 86;

    doc
        .save()
        .roundedRect(
            PAGE.MARGIN_X,
            cursorY,
            PAGE.CONTENT_WIDTH,
            headerHeight,
            14
        )
        .fill(COLORS.PRIMARY)
        .restore();

    doc
        .fillColor(COLORS.WHITE)
        .font("Helvetica-Bold")
        .fontSize(22)
        .text(
            "VaultPay Financial Core",
            PAGE.MARGIN_X + 22,
            cursorY + 18
        );

    doc
        .fillColor("#DBEAFE")
        .font("Helvetica")
        .fontSize(11)
        .text(
            "Official Payment Receipt",
            PAGE.MARGIN_X + 22,
            cursorY + 46
        );

    doc
        .fontSize(9)
        .text(
            "Powered by Nexus Corporate Services",
            PAGE.MARGIN_X + 22,
            cursorY + 60
        );

    doc
        .fillColor(COLORS.WHITE)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(
            formatDate(invoice.paidAt),
            PAGE.WIDTH - 145,
            cursorY + 22,
            {
                width: 95,
                align: "right",
            }
        );

    cursorY += headerHeight + 16;
};

const drawSuccessBadge = (
    doc
) => {
    const badgeWidth = 182;
    const badgeHeight = 28;

    const x =
        (PAGE.WIDTH -
            badgeWidth) /
        2;

    doc
        .save()
        .roundedRect(
            x,
            cursorY,
            badgeWidth,
            badgeHeight,
            14
        )
        .fill(
            COLORS.SUCCESS_BG
        )
        .restore();

    doc
        .fillColor(
            COLORS.SUCCESS
        )
        .font(
            "Helvetica-Bold"
        )
        .fontSize(10)
        .text(
            "PAYMENT SUCCESSFUL",
            x,
            cursorY + 9,
            {
                width:
                    badgeWidth,
                align:
                    "center",
            }
        );

    cursorY += 42;
};

const drawReceiptInformationCard = (
    doc,
    invoice
) => {
    drawSectionTitle(
        doc,
        "Receipt Information"
    );

    const card = drawCard(doc, {
        height: 68,
    });

    drawInfoRow(doc, {
        label: "Invoice Number",
        value: invoice.invoiceNumber,
        x: card.x,
        y: card.y,
        width: 140,
    });

    drawInfoRow(doc, {
        label: "Status",
        value: invoice.status,
        x: card.x + 145,
        y: card.y,
        width: 80,
    });

    drawInfoRow(doc, {
        label: "Paid Date",
        value: formatDate(invoice.paidAt),
        x: card.x + 255,
        y: card.y,
        width: 150,
    });

    drawInfoRow(doc, {
        label: "Method",
        value: "Stripe Checkout",
        x: card.x + 415,
        y: card.y,
        width: 70,
    });

    cursorY += 76;

    sectionGap();
};

const drawBillToCard = (
    doc,
    invoice
) => {
    drawSectionTitle(
        doc,
        "Bill To"
    );

    const card = drawCard(doc, {
        height: 72,
    });

    doc
        .fillColor(COLORS.TEXT)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(
            invoice.client?.name || "-",
            card.x,
            card.y
        );

    doc
        .fillColor(COLORS.SUCCESS)
        .font("Helvetica")
        .fontSize(9)
        .text(
            "Registered Client",
            card.x,
            card.y + 18
        );

    doc
        .fillColor(COLORS.MUTED)
        .font("Helvetica")
        .fontSize(10)
        .text(
            invoice.client?.email || "-",
            card.x,
            card.y + 40,
            {
                width: card.width,
                ellipsis: true,
            }
        );

    cursorY += 82;

    sectionGap();
};

const drawDescriptionCard = (
    doc,
    invoice
) => {
    drawSectionTitle(
        doc,
        "Description"
    );

    const description =
        invoice.description ||
        "No description provided.";

    const textHeight =
        doc.heightOfString(
            description,
            {
                width:
                    PAGE.CONTENT_WIDTH -
                    CARD.PADDING_X * 2,
                lineGap: 2,
            }
        );

    const cardHeight = Math.max(
        56,
        textHeight + 24
    );

    const card = drawCard(doc, {
        height: cardHeight,
    });

    doc
        .fillColor(COLORS.TEXT)
        .font("Helvetica")
        .fontSize(10)
        .text(
            description,
            card.x,
            card.y,
            {
                width: card.width,
                lineGap: 2,
            }
        );

    cursorY +=
        cardHeight + 8;

    sectionGap();
};

const drawAmountCard = (
    doc,
    invoice
) => {
    drawSectionTitle(
        doc,
        "Amount Paid"
    );

    const card = drawCard(doc, {
        height: 76,
        fill: COLORS.PRIMARY_LIGHT,
        border: COLORS.PRIMARY_BORDER,
    });

    doc
        .fillColor(COLORS.MUTED)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(
            "TOTAL PAYMENT",
            card.x,
            card.y
        );

    doc
        .fillColor(COLORS.PRIMARY)
        .font("Helvetica-Bold")
        .fontSize(26)
        .text(
            formatCurrency(
                invoice.amount,
                invoice.currency
            ),
            card.x,
            card.y + 16
        );

    doc
        .fillColor(COLORS.SUCCESS)
        .font("Helvetica")
        .fontSize(9)
        .text(
            "Payment processed successfully via Stripe Checkout",
            card.x,
            card.y + 50
        );

    cursorY += 86;

    sectionGap();
};

const drawPaymentInformationCard = (
    doc,
    invoice
) => {
    drawSectionTitle(
        doc,
        "Payment Information"
    );

    const card = drawCard(doc, {
        height: 96,
    });

    const paymentMethod = invoice.paymentMethod || "Stripe Checkout";
    const paymentStatus = invoice.paymentStatus || "Successful";
    const paymentIntent = invoice.stripePaymentIntentId || invoice.paymentIntent || "-";

    const rowValueX = card.x + 150;
    const rowWidth = card.width - 150;

    drawInfoRow(doc, {
        label: "Payment Method",
        value: paymentMethod,
        x: card.x,
        y: card.y,
        width: rowWidth,
    });

    drawInfoRow(doc, {
        label: "Payment Status",
        value: paymentStatus,
        x: card.x,
        y: card.y + 24,
        width: rowWidth,
    });

    drawInfoRow(doc, {
        label: "Payment Intent",
        value: paymentIntent,
        x: card.x,
        y: card.y + 48,
        width: rowWidth,
    });

    cursorY += 104;

    sectionGap();
};

const drawFooter = (doc) => {
    const footerTop = PAGE.HEIGHT - PAGE.MARGIN_BOTTOM - FOOTER.HEIGHT;
    const footerWidth = PAGE.CONTENT_WIDTH;
    const footerX = PAGE.MARGIN_X;

    doc
        .save()
        .strokeColor(COLORS.BORDER)
        .lineWidth(1)
        .moveTo(
            footerX,
            footerTop
        )
        .lineTo(
            footerX + footerWidth,
            footerTop
        )
        .stroke()
        .restore();

    doc
        .fillColor(COLORS.SUCCESS)
        .font("Helvetica-Bold")
        .fontSize(12.5)
        .text(
            "Thank You!",
            footerX,
            footerTop + 8,
            {
                width: footerWidth,
                align: "center",
            }
        );

    doc
        .fillColor(COLORS.MUTED)
        .font("Helvetica")
        .fontSize(7.25)
        .text(
            "Payment received successfully. This receipt confirms the above transaction.",
            footerX + 26,
            footerTop + 20,
            {
                width: footerWidth - 52,
                align: "center",
                lineGap: 0,
            }
        );

    doc
        .fillColor(COLORS.MUTED)
        .font("Helvetica")
        .fontSize(8)
        .text(
            [
                "VaultPay Financial Core | Powered by Nexus Corporate Services",
                `New York, NY, USA | © ${new Date().getFullYear()} VaultPay Financial Core`,
            ].join("\n"),
            footerX,
            footerTop + 34,
            {
                width: footerWidth,
                align: "center",
                lineGap: 1,
            }
        );
};

const receiptPdfTemplate = (
    doc,
    invoice
) => {
    cursorY = PAGE.MARGIN_TOP;
    const footerTop = PAGE.HEIGHT - PAGE.MARGIN_BOTTOM - FOOTER.HEIGHT;

    doc
        .rect(
            0,
            0,
            PAGE.WIDTH,
            PAGE.HEIGHT
        )
        .fill(COLORS.BACKGROUND);

    drawHeader(doc, invoice);

    drawSuccessBadge(doc);

    drawReceiptInformationCard(
        doc,
        invoice
    );

    drawBillToCard(
        doc,
        invoice
    );

    drawDescriptionCard(
        doc,
        invoice
    );

    drawAmountCard(
        doc,
        invoice
    );

    drawPaymentInformationCard(
        doc,
        invoice
    );

    const maxContentBottom = footerTop - FOOTER.GAP;

    if (cursorY > maxContentBottom) {
        cursorY = maxContentBottom;
    }

    drawFooter(doc);
};

export default receiptPdfTemplate;