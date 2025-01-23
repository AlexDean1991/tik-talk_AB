import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[dnd]'
})


export class DndDirective {

  @HostBinding('class.fileover')
  fileover = false

}
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log(event)
  }

  export class DndDirective {
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log(event)
  }

  export class DndDirective {
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log(event)
  }

}
