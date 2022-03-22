import eventBus from './eventBus';
import cache from './cache';
import timeFormat from './format';
import debounce from './debounce';
import Msg from './Msg';
export const isArrEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((ele) => arr2.includes(ele));
export { eventBus, cache, timeFormat, debounce, Msg };
