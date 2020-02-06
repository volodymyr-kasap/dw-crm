import {PotentialClient} from '../../models/potential-client.model';
import {EventsAction} from '../../models/events-action.model';
import {EventsResult} from '../../models/events-result.model';
import {WayToAdd} from '../../models/way-to-add.model';
import {EventsActionEnum} from '../../shared/events-action-enum';
import {EventsResultEnum} from '../../shared/events-result-enum';
import {PotentialClientAction, PotentialUnion} from '../actions/potential-client.actions';
import {WayToAddEnum} from '../../shared/way-to-add-enum';
import {CompanyType} from '../../models/company-type.model';
import {CompanyTypesEnum} from '../../shared/company-types-enum';

export interface State  {
  clientList: PotentialClient[];
  clientsCount: number;
  currentClient: PotentialClient;
  //managersList: Manager[];
  eventsActionList: EventsAction[];
  eventResultList: EventsResult[];
  wayToAddList: WayToAdd[];
  companyTypes: CompanyType[];
}

export const initialState: State = {
  clientList: null,
  clientsCount: null,
  currentClient: null,
  eventsActionList: [
    new EventsAction(EventsActionEnum.TelephoneConversation, 'Разговор', 'fas fa-phone', 'color-158f44', 'bg-158f44 text-white'),
    new EventsAction(EventsActionEnum.Correspondence, 'Переписка', 'fas fa-sms', 'color-db8b22', 'bg-c51c24 text-white'),
    new EventsAction(EventsActionEnum.Meeting, 'Встреча', 'fas fa-handshake', 'color-4e70ba', 'bg-c51c24 text-white'),
    new EventsAction(EventsActionEnum.Carry, 'Перенос', 'fas fa-random', '', 'bg-000000 text-white'),
    new EventsAction(EventsActionEnum.NoAnswer, 'Нет ответа', 'fas fa-phone-slash', 'color-c51c24', 'bg-c51c24 text-white'),
    new EventsAction(EventsActionEnum.Presentation, 'Нет ответа', 'fas fa-phone-slash', 'color-c51c24', 'bg-c51c24 text-white')
  ],
  eventResultList: [
    new EventsResult(EventsResultEnum.NotProcessed, 'text-secondary', '',  'Не обработан', 'bd-E6E6E6 color-707070'),
    new EventsResult(EventsResultEnum.WeakInterest, 'fas fa-meh', 'color-adfffb', 'Слабый интерес', 'bd-D8F7F3 color-707070'),
    new EventsResult(EventsResultEnum.MiddleInterest, 'fas fa-smile', 'color-91bdff', 'Средний интерес', 'bd-A6E0FC color-707070'),
    new EventsResult(EventsResultEnum.StrongInterest, 'fas fa-laugh', 'color-9cd5b4', 'Сильный интерес', 'bd-B7E281 color-707070'),
    new EventsResult(EventsResultEnum.AtTheFinishStage, 'fas fa-laugh-wink', 'color-e71baa', 'На стадии финиша - ДОБИТЬ!', 'bd-DC0083 text-white'),
    new EventsResult(EventsResultEnum.Cooperation, 'fas fa-laugh-squint', 'color-158f44', 'Сотрудничество', 'bd-7DBD36 text-white'),
    new EventsResult(EventsResultEnum.Pause, 'fas fa-pause-circle', 'color-db8b22', 'Пауза - неактивный клиент', 'bd-FF7123 text-white'),
    new EventsResult(EventsResultEnum.Renouncement, 'fas fa-times-circle', 'color-c51c24', 'Отказ', 'bd-E30000 text-white'),
    new EventsResult(EventsResultEnum.RevisionOfConditions, 'fas fa-file-signature', 'color-2cd49f',  'Пересмотр условий', 'bd-25BEB2 text-white'),
    new EventsResult(EventsResultEnum.ChoosingAnotherCompany, 'fas fa-search', 'color-874f4f', 'Выбор другой компании', 'bd-8E1600 text-white'),
    new EventsResult(EventsResultEnum.NotRelevant, 'fas fa-window-close', 'color-6c757d', 'Не заинтересован', 'bd-BABABA text-white'),
  ],
  wayToAddList: [
    new WayToAdd(WayToAddEnum.TryDemo, 'Через Demo тур', 'fas fa-laptop'),
    new WayToAdd(WayToAddEnum.Skype, 'Добавление в skype', 'fab fa-skype'),
    new WayToAdd(WayToAddEnum.SiteRegistration, 'Регистрация на сайте', 'fas fa-user-plus'),
    new WayToAdd(WayToAddEnum.ActiveClientSearch, 'Активный поиск клиента', 'fas fa-search'),
    new WayToAdd(WayToAddEnum.EmailMessage, 'Письмо на почту', 'fas fa-envelope'),
    new WayToAdd(WayToAddEnum.Exhibition, 'Найден на выставке', 'fas fa-comments'),
    new WayToAdd(WayToAddEnum.OtherCompanyRecomendation, 'Рекомендации другой компании', ''),
    new WayToAdd(WayToAddEnum.PhoneCall, 'Телефонный звонок', 'fas fa-phone-volume'),
    new WayToAdd(WayToAddEnum.SiteOnlineChat, 'Онлайн чат на сайте', 'fas fa-comment'),
  ],
  companyTypes: [
    new CompanyType(CompanyTypesEnum.Brand, 'Бренд'),
    new CompanyType(CompanyTypesEnum.Shop, 'Магазин')
  ]
};

export function potentialReducer(state: State = initialState, action: PotentialUnion)  {
  switch (action.type) {
    case PotentialClientAction.SetPotentialList:
      return {
        ...state,
        clientList: action.payload,
        clientsCount: action.payload.length
      };
    case PotentialClientAction.SetCurrentPotentialClient: {
      return {
        ...state,
        currentClient: action.payload
      }
    }
    default:
      return state;
  }
}
