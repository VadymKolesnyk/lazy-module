import { Component, ComponentRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sw-lazy',
  template: '<ng-template #container style="display: none;"></ng-template>'
})
export class SwLazyComponent implements OnChanges, OnDestroy {
  @Input() when: boolean;
  @Input() component: Type<any>;
  @Input() inputBindings: { [name: string]: any };
  @Input() outputBindings: { [name: string]: Function };
  @Output() ready = new EventEmitter<void>();

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  componentRef: ComponentRef<any>;

  subscriptions: Subscription[] = [];

  constructor( ) { }

  ngOnChanges({ when, inputBindings, outputBindings }: SimpleChanges): void {
    if ((when && this.when && this.component && !this.componentRef)) {
      this.componentRef = this.container.createComponent(this.component);
      this.bindInput();
      this.bindOutput();
      this.ready.emit();
    } else {
      if (inputBindings) {
        this.bindInput();
      }
      if (outputBindings) {
        this.unbindOutputs();
        this.bindOutput();
      }
    }
  }

  private bindInput() {
    if (this.componentRef && this.inputBindings) {
      for (const prop in this.inputBindings) {
        this.componentRef.instance[prop] = this.inputBindings[prop];
      }
    }
  }

  private bindOutput() {
    if (this.componentRef && this.outputBindings) {
      for (const prop in this.outputBindings) {
        const subscription = this.componentRef.instance[prop].subscribe($event => this.outputBindings[prop]($event));
        this.subscriptions.push(subscription);
      }
    }
  }

  private unbindOutputs() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.unbindOutputs();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }


}
