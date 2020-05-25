import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Store} from "@ngrx/store";
import {DigitalRelayState, selectTeamsList} from "../../store";
import {Observable} from "rxjs";
import {State} from "../../store/team-model/team-model.reducer";
import {Dictionary} from "@ngrx/entity";
import {TeamModel} from "../../store/team-model/team-model.model";
import {load} from "../../store/actions/teams.actions";

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  teams: Dictionary<TeamModel>;
  state: Observable<State>;
  loading = false;
  errorMessage = "";

  constructor(private store: Store<DigitalRelayState>) {
    this.state = store.select(selectTeamsList)
  }

  ngOnInit(): void {
    this.state.subscribe((state) => {
      this.teams = state.entities;
      this.loading = state.loading;
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(load({}))
  }
}

@Pipe({name: 'mapToArray'})
export class MapToArray implements PipeTransform {
  transform(value): any {
    let arr = [];
    for (let key in value) {
      arr.push(value[key]);
    }
    return arr;
  }
}
