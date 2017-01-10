import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';


class Joke{
  setup: string;
  punchline: string;
  hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

let joke = new Joke("What did the cheese say when it looked in the mirror?","Hello-Me (Halloumi)");

@Component({
  selector: 'joke',
  template: `
<div class="card card-block">
	<h4 class="card-title">{{data.setup}}</h4>
	<p class="card-text"
	   [hidden]="data.hide">{{data.punchline}}</p>
	<button class="btn btn-primary"
	    (click)="data.toggle()">Tell Me</button>

</div>
  `
})
class JokeComponent {
  @Input('joke') data: Joke; 
}

@Component({
	selector: 'joke-list',
	template: `
	<joke-form> (jokeCreated)="addJoke($event)"</joke-form>
	</form>
        <joke *ngFor="let j of jokes" [joke]="j"></joke> 
  `
})
class JokeListComponent {
	jokes: Joke[];

	constructor() {
		this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Hello-me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’")
        ]
  }
}

@Component({
	selector: 'app',
	template: `<joke-list></joke-list>`
})
class AppComponent{
    
}

@NgModule({
	imports: [BrowserModule],
	declarations: [JokeListComponent,JokeComponent,AppComponent],
	bootstrap: [AppComponent]
})
class AppModule {
} 

platformBrowserDynamic().bootstrapModule(AppModule);