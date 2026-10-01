/**
 * Configuração central da loja.
 * Troque aqui: nome, logo, WhatsApp e textos institucionais.
 * As cores principais ficam em src/styles.css (--primary / --accent).
 */
export const STORE_CONFIG = {
  name: "ALLIANCE IMPORTS",
  tagline: "Importados com confiança, qualidade e entrega para todo o Brasil",
  logoUrl: "/logo-alliance-imports.jpeg",
  /**
   * ALTERE O WHATSAPP SOMENTE AQUI.
   * Use formato internacional, apenas números: 55 + DDD + número.
   * Exemplo: 5511999999999
   */
  whatsappNumber: "5521980201153",
  shippingFee: 35,
  email: "contato@allianceimports.com.br",
  instagram: "@allianceimports",
  currency: "BRL",
  locale: "pt-BR",
} as const;
