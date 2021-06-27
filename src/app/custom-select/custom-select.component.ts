import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent implements OnChanges, OnInit {
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.showList = this.elementRef.nativeElement.contains(event.target);
  }

  @Input()
  multiSelect = false;

  @Input()
  options: string[];
  filteredOptions: string[];

  @Input()
  placeholder: string = 'Choose...';

  @Input()
  required: boolean = false;

  @Output()
  readonly selectionChanged = new EventEmitter<string[]>();

  selectedToOption = new Map<string, { selected: boolean; visible: boolean }>();
  showList = false;
  selectionText: string = '';

  constructor(private readonly elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const multiSelectChange = changes.multiSelect;
    if (multiSelectChange != null) {
      if (
        multiSelectChange.currentValue === false &&
        this.getCurrentlySelectedValues().length > 1
      ) {
        Object.values(this.options).forEach((option) =>
          this.selectedToOption.set(option, {
            selected: false,
            visible: this.filteredOptions.includes(option),
          })
        );
        this.selectionText = '';
        this.selectionChanged.emit([]);
      }
    }

    const optionsChange = changes.options;
    if (optionsChange) {
      const options = optionsChange.currentValue;
      this.filteredOptions = [...options];
      options.forEach((option) =>
        this.selectedToOption.set(option, {
          selected: false,
          visible: this.filteredOptions.includes(option),
        })
      );
      this.onValueClick(this.options[0]);
    }
  }

  ngOnInit(): void {
    if (this.required) {
      // TODO Validators -> need FormControl for that
    }
  }

  onClick(): void {
    this.showList = !this.showList;
  }

  onInputChange(inputValue: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())
    );
    this.selectedToOption.forEach(
      (params, key) => (params.visible = this.filteredOptions.includes(key))
    );
  }

  onValueClick(selectedKey: string): void {
    let selectedValues: string[];
    this.selectedToOption.get(selectedKey).selected =
      !this.selectedToOption.get(selectedKey).selected;
    if (!this.multiSelect) {
      Object.values(this.options)
        .filter((key) => key !== selectedKey)
        .forEach((option) =>
          this.selectedToOption.set(option, {
            ...this.selectedToOption.get(option),
            selected: false,
          })
        );
      selectedValues = this.selectedToOption.get(selectedKey)
        ? [selectedKey]
        : [];
    } else {
      selectedValues = this.getCurrentlySelectedValues();
    }
    this.selectionText = selectedValues.join(', ');
    this.selectionChanged.emit(selectedValues);
  }

  private getCurrentlySelectedValues(): string[] {
    return Array.from(this.selectedToOption.entries())
      .filter((it) => it[1].selected === true)
      .map((it) => it[0]);
  }
}
