import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValuesToString',
  pure: false
})
export class MapValuesToStringPipe implements PipeTransform {

  transform(map: { [key: string]: boolean }): string {
    return Object.entries(map).filter(it => it[1]).map(it => it[0]).join(', ');
  }
}
