import { InMemAmfGraphStore } from './InMemAmfGraphStore';
import { AmfStoreDomEventsMixin } from './mixins/AmfStoreDomEventsMixin';

export class DomEventsAmfStore extends AmfStoreDomEventsMixin(InMemAmfGraphStore) {
  
}
