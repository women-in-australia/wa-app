export function getColor(status) {
  switch (status) {
    case -1:
      return '1px red solid';
    case 1:
      return '1px green solid';
    case 2:
      return '1px blue solid';
    default:
      //true, false, undefined
      return '';
  }
}
