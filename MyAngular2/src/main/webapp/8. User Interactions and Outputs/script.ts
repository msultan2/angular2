import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';
import {EventEmitter, Output} from '@angular/core';

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
	selector: 'joke-form',
	template: `
<div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the setup"
           #setup>
  </div>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the punchline"
           #punchline>
  </div>
  <button type="button"
          class="btn btn-primary"
          (click)="createJoke(setup.value,punchline.value)">Create
  </button>
</div>
  `
  //Note:setup and puchline variables are only seen within the template only
})
class JokeFormComponent {
  @Output() jokeCreated=new EventEmitter<Joke>();
  
  createJoke(setup: string, punchline: string){
    this.jokeCreated.emit(new Joke(setup,punchline));
  }
}



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
	<joke-form (jokeCreated)="addJoke($event)"></joke-form>
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
  
  addJoke(joke){
    this.jokes.unshift(joke); //unshift: adds in head of array
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
	declarations: [JokeListComponent,JokeComponent,
	                AppComponent,JokeFormComponent],
	bootstrap: [AppComponent]
})
class AppModule {
} 

platformBrowserDynamic().bootstrapModule(AppModule);