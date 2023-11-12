import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() categorySelected = new EventEmitter<string>();
  currentCategory: string = '';
  public navigation = [
    { name: 'Dashboard', current: true, value:"dashboard" },
    { name: 'Italian', value:"italian", current: false },
    { name: 'American', value:"american", current: false },
    { name: 'French', value:"french", current: false },
    { name: 'Japanese', value:"japanese", current: false },
    { name: 'Mexican', value:"mexican", current: false },
    { name: 'Chinese', value:"chinese", current: false },
    { name: 'Indian', value:"indian", current: false },
    { name: 'Thai', value:"thai", current: false },
    { name: 'Greek', value:"greek", current: false },
    { name: 'Spanish', value:"spanish", current: false },
    { name: 'German', value:"german", current: false },
    { name: 'Irish', value:"irish", current: false },
    { name: 'Desserts', value:"desserts", current: false },
    { name: 'Drinks', value:"drinks", current: false },
    { name: 'Seafood', value:"seafood", current: false },
    { name: 'Breakfast', value:"breakfast", current: false },
    { name: 'Lunch', value:"lunch", current: false },
    { name: 'Dinner', value:"dinner", current: false },
    { name: 'Snacks', value:"snacks", current: false },
    { name: 'Appetizers', value:"appetizers", current: false },
    { name: 'Soups', value:"soups", current: false },
    { name: 'Salads', value:"salads", current: false },
  ];


  selectCategory(value: string) {
    this.currentCategory = value; // Set the current category
    this.categorySelected.emit(value);
  }

}
