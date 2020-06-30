import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive(
{
    selector:'[appDropdownDirective]' 
})
export class DropdowmDirective{
    

@HostBinding('class.open') status=false;
@HostListener ('click') toggle()
{
   this.status= !this.status;
}
}