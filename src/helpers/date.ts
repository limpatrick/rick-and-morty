import 'dayjs/locale/en';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const format = (date: string, template: string) => dayjs(date).locale('en').format(template);
