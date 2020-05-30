import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from './reducers/auth.reducer';
import {routerReducer, RouterReducerState, SerializedRouterStateSnapshot} from '@ngrx/router-store';
import * as fromTeamModel from './team-model/team-model.reducer';
import * as fromUserModel from './user-model/user-model.reducer';
import {UserModel} from './user-model/user-model.model';
import {TeamModel} from './team-model/team-model.model';


export interface DigitalRelayState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  auth: fromAuth.State;
  teamModel: fromTeamModel.State;
  users: fromUserModel.State;
}

export const reducers: ActionReducerMap<DigitalRelayState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  teamModel: fromTeamModel.reducer,
  users: fromUserModel.reducer
};

export const metaReducers: MetaReducer<DigitalRelayState>[] = !environment.production ? [] : [];

export const selectUser = (state: DigitalRelayState) => state.auth;
export const selectCurrentUser = (state: DigitalRelayState) => state.auth.user;
export const selectCurrentEmail = (state: DigitalRelayState) => state.auth.user.email;
export const selectLoginStatus = (state: DigitalRelayState) => state.auth.isLoggedIn;
export const selectTeamsList = (state: DigitalRelayState) => state.teamModel;
export const selectUsersList = (state: DigitalRelayState) => state.users;

export const selectMyTeams = createSelector(
  selectCurrentUser,
  selectTeamsList,
  (selectedUser: UserModel, allTeams: fromTeamModel.State) => {
    const filtered: TeamModel[] = [];
    for (const key in allTeams.entities) {
      if (selectedUser && allTeams) {
        // noinspection JSUnfilteredForInLoop
        if (allTeams.entities[key].members.includes(selectedUser.email)) {
          // noinspection JSUnfilteredForInLoop
          filtered.push(allTeams.entities[key]);
        }
      } else {
        // noinspection JSUnfilteredForInLoop
        filtered.push(allTeams.entities[key]);
      }
    }
    return filtered;
  }
);


export const initialTestState = {
  auth: {
    isLoggedIn: true,
    user: {
      id: '5ec966e29f49583e027519cb',
      email: 'm.pilnan@gmail.com',
      name: 'Matúš Pilňan',
      tempo: 670
    },
    errorMessage: null,
    expiresAt: 1590609765
  },
  teamModel: {
    ids: [
      '5ec5914ced59b339a6be6c50',
      '5ec82ea3303658e595f8154a',
      '5ecbe3ca01c861927d57e4af',
      '5ecbe45c01c861927d57e4b0',
      '5eceb3c3fa9c5a29ab200d38'
    ],
    entities: {
      '5ec5914ced59b339a6be6c50': {
        id: '5ec5914ced59b339a6be6c50',
        name: 'Matt\'s test team',
        members: [
          'm.pilnan@gmail.com',
          'matt@nobien.net'
        ],
        stages: [
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'matt@nobien.net',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'matt@nobien.net'
        ]
      },
      '5ec82ea3303658e595f8154a': {
        id: '5ec82ea3303658e595f8154a',
        name: 'Team string',
        members: [
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'martin.civan5@gmail.com'
        ],
        stages: [
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com'
        ]
      },
      '5ecbe3ca01c861927d57e4af': {
        id: '5ecbe3ca01c861927d57e4af',
        name: 'HellaMega',
        members: [
          'm.pilnan@gmail.com',
          'novemaily@mailinator.com',
          'novyclen2@mailinator.com'
        ],
        stages: [
          'novemaily@mailinator.com',
          'novemaily@mailinator.com',
          'm.pilnan@gmail.com',
          'novemaily@mailinator.com',
          'm.pilnan@gmail.com',
          'novemaily@mailinator.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com'
        ]
      },
      '5ecbe45c01c861927d57e4b0': {
        id: '5ecbe45c01c861927d57e4b0',
        name: 'Moj druhy tim',
        members: [
          'matt@nobien.net',
          'm.pilnan@gmail.com'
        ],
        stages: [
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com',
          'matt@nobien.net',
          'm.pilnan@gmail.com'
        ]
      },
      '5eceb3c3fa9c5a29ab200d38': {
        id: '5eceb3c3fa9c5a29ab200d38',
        name: 'VBPS',
        members: [
          'm.pilnan@gmail.com'
        ],
        stages: [
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com',
          'm.pilnan@gmail.com'
        ]
      }
    },
    loading: false,
    errorMessage: ''
  },
  users: {
    ids: [],
    entities: {}
  }
};
