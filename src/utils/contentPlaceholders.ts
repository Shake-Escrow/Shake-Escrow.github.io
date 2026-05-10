import { REFUND_PROTOCOL_CONTRACTS } from '../config/refundProtocolContracts';

const placeholderValues: Record<string, string> = REFUND_PROTOCOL_CONTRACTS;
const placeholderPattern = /{{\s*([A-Z0-9_]+)\s*}}/g;

export const replaceContentPlaceholders = (content: string): string =>
  content.replace(placeholderPattern, (match, key: string) => placeholderValues[key] ?? match);
