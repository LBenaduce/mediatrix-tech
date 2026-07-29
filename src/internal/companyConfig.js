/**
 * Fonte única dos dados exibidos na área interna e no PDF.
 *
 * O projeto comprova somente o nome, a paleta e a localização abaixo.
 * Preencha telefone, documento, e-mail e logoUrl quando os dados oficiais e o
 * arquivo de logotipo isolado forem disponibilizados. Nenhum dado é inventado.
 */
export const companyConfig = {
  name: "Itamec Mecânica",
  shortName: "ITAMEC",
  document: "",
  phone: "",
  email: "",
  address: "Bairro Itapeúna - Eldorado/SP",
  logoUrl: "",
  colors: {
    navy: "#071426",
    blue: "#1f6ed4",
    lightBlue: "#79a9f2",
    ink: "#142033",
    muted: "#64748b",
  },
};

export const missingCompanyFields = [
  ["document", "CNPJ/CPF"],
  ["phone", "telefone/WhatsApp"],
  ["email", "e-mail"],
  ["logoUrl", "arquivo de logotipo isolado"],
].filter(([field]) => !companyConfig[field]).map(([, label]) => label);
