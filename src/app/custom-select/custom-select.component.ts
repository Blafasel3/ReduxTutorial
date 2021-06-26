import {
  ChangeDetectorRef,
  Component,
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
  @HostListener('focusout ') // TODO überdenken
  onMouseLeave() {
    this.showList = false;
  }

  @HostListener('focusin')
  onMouseEnter() {
    this.showList = true;
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
      console.log(this.selectedToOption);
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
    console.log(selectedKey, this.selectedToOption.get(selectedKey));
    this.selectedToOption.get(selectedKey).selected =
      !this.selectedToOption.get(selectedKey).selected;
    if (!this.multiSelect) {
      Object.values(this.options)
        .filter((key) => key !== selectedKey)
        .forEach((option) =>
          this.selectedToOption.set(option, {
            selected: false,
            visible: this.filteredOptions.includes(option),
          })
        );
      selectedValues = this.selectedToOption[selectedKey] ? [selectedKey] : [];
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
