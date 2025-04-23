import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeOfCom',
  standalone: true
})
export class TimeOfComments implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return 'только что';

    const date = new Date(value);
    if (isNaN(date.getTime())) return 'только что';

    // Преобразуем время к локальному времени (в данном случае для Москвы, UTC+3)
    const localDate = new Date(date.getTime() + 3 * 60 * 60 * 1000); // Добавляем 3 часа

    const now = new Date();
    const seconds = Math.floor((now.getTime() - localDate.getTime()) / 1000);

    if (seconds < 60) {
      return `${seconds} секунд назад`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} минут назад`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      if (hours === 1) {
        return `${hours} час назад`;
      } else if (hours < 5) {
        return `${hours} часа назад`;
      } else {
        return `${hours} часов назад`;
      }
    }

    // Если прошло 24 часа и больше, считаем дни
    const days = Math.floor(hours / 24);
    if (days === 1) {
      return `${days} день назад`;
    } else if (days < 5) {
      return `${days} дня назад`;
    } else {
      return `${days} дней назад`;
    }
  }
}
