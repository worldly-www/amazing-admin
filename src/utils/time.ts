import moment, { MomentInput } from 'moment';
import { DATE_FORMAT } from '@/constants';

export function dateToUnit(date: MomentInput, unit: string = DATE_FORMAT) {
  if (Array.isArray(date)) {
    return date.map(item => moment(item).format(unit));
  }
  return moment && moment(date).format(unit);
}

export function dateToMoment(date: MomentInput) {
  if (Array.isArray(date)) {
    return date.map(item => moment(item));
  }
  return moment && moment(date);
}
