import {Action} from '@ngrx/store';
import {PromoItem} from '../../models/promo.model';

export enum PromoAction {
  LoadPromos = '[Promo] LoadPromos',
}

export class LoadPromos implements Action {
  readonly type = PromoAction.LoadPromos;

  constructor(public payload: PromoItem[]) {}
}

export type PromoUnion = LoadPromos;
