import { COMPANY_ADDRESS_TOKENS } from '../config/companyAddress';
import { REFUND_PROTOCOL_CONTRACTS } from '../config/refundProtocolContracts';

const placeholderValues: Record<string, string> = {
  ...REFUND_PROTOCOL_CONTRACTS,
  ...COMPANY_ADDRESS_TOKENS,
};

const blankAddressLineKeys = new Set([
  'COMPANY_ADDRESS_ONELINE',
  'COMPANY_ADDRESS_STREET',
  'COMPANY_ADDRESS_CITY_LINE',
  'COMPANY_CITY_STATE',
]);

const visibleText = (text: string): string => text.replace(/<[^>]+>/g, '').trim();

export const replaceKnownPlaceholders = (
  content: string,
  values: Record<string, string | undefined>
): string => {
  const placeholderPattern = /{{\s*([A-Z0-9_]+)\s*}}/g;
  let result = '';
  let cursor = 0;

  for (const match of content.matchAll(placeholderPattern)) {
    const key = match[1];
    const raw = values[key];
    const start = match.index ?? 0;
    const end = start + match[0].length;
    if (raw == null) {
      result += content.slice(cursor, end);
      cursor = end;
      continue;
    }

    const value = raw.trim();
    if (value === '' && blankAddressLineKeys.has(key)) {
      const lineStart = content.lastIndexOf('\n', start - 1) + 1;
      const newlineAt = content.indexOf('\n', end);
      const lineEnd = newlineAt === -1 ? content.length : newlineAt;
      const beforeOnLine = content.slice(lineStart, start);
      const afterOnLine = content.slice(end, lineEnd);
      const labelOrEmpty = visibleText(beforeOnLine) === '' || visibleText(beforeOnLine).endsWith(':');
      if (cursor <= lineStart && labelOrEmpty && visibleText(afterOnLine) === '') {
        if (cursor < lineStart) result += content.slice(cursor, lineStart);
        cursor = newlineAt === -1 ? content.length : newlineAt + 1;
        continue;
      }

      let prefix = content.slice(cursor, start);
      let next = end;
      const commaAfter = /^[ \t]*,[ \t]*/.exec(content.slice(end));
      const commaBefore = /,[ \t]*$/.exec(prefix);
      if (commaAfter) {
        next += commaAfter[0].length;
      } else if (commaBefore) {
        prefix = prefix.slice(0, -commaBefore[0].length);
      }
      if (prefix.endsWith(' ') && content[next] === ' ') next += 1;
      result += prefix;
      cursor = next;
      continue;
    }

    result += content.slice(cursor, start) + value;
    cursor = end;
  }

  result += content.slice(cursor);
  return result;
};

export const replaceContentPlaceholders = (content: string): string =>
  replaceKnownPlaceholders(content, placeholderValues);

export function resolveContentPlaceholders<T>(value: T): T {
  if (typeof value === 'string') {
    return replaceContentPlaceholders(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveContentPlaceholders(item)) as T;
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      result[key] = resolveContentPlaceholders(child);
    }
    return result as T;
  }
  return value;
}
