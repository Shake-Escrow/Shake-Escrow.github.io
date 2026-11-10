import companyAddressJson from './company-address.json';

export const COMPANY_ADDRESS = companyAddressJson;

const field = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const joinAddressParts = (parts: Array<string | undefined>, separator = ', '): string =>
  parts.map((part) => (part ?? '').trim()).filter((part) => part.length > 0).join(separator);

const line1 = field(COMPANY_ADDRESS.line1);
const line2 = field(COMPANY_ADDRESS.line2);
const city = field(COMPANY_ADDRESS.city);
const state = field(COMPANY_ADDRESS.state);
const stateCode = field(COMPANY_ADDRESS.stateCode);
const postalCode = field(COMPANY_ADDRESS.postalCode);
const street = joinAddressParts([line1, line2]);
const region = joinAddressParts([stateCode || state, postalCode], ' ');

export const COMPANY_ADDRESS_TOKENS = {
  COMPANY_ADDRESS_ONELINE: joinAddressParts([street, city, region]),
  COMPANY_ADDRESS_STREET: street,
  COMPANY_ADDRESS_CITY_LINE: joinAddressParts([city, joinAddressParts([state, postalCode], ' ')]),
  COMPANY_CITY_STATE: joinAddressParts([city, state]),
  COMPANY_STATE: state,
  COMPANY_COUNTRY: field(COMPANY_ADDRESS.country),
  COMPANY_COUNTRY_ES: field(COMPANY_ADDRESS.es?.country),
  COMPANY_CITY_UZ: field(COMPANY_ADDRESS.uz?.city),
  COMPANY_STATE_UZ: field(COMPANY_ADDRESS.uz?.state),
  COMPANY_COUNTRY_UZ: field(COMPANY_ADDRESS.uz?.country),
} as const;
