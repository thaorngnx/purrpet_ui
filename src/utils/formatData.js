import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value);
};

export const formatDateTime = (value) => {
  const date = new Date(value);
  //get day/month/year not include time
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  //get hour/minute/second
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  //return format
  return `${day}/${month}/${year}`;
};
export const formatTimeToNow = (value) => {
  const date = new Date(value);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
};
