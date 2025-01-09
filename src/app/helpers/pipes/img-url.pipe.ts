import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  /* Когда в конце функции или метода идет двоеточие и дальше тип (Стринг, например), то значит, что мы ожидаем, что этот
  метод вернет такой тип данных */

  transform(value: string | null): string {
    if (!value) return '';
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}

