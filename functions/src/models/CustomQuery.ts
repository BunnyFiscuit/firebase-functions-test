export class CustomQuery {
  field: string;
  operator: FirebaseFirestore.WhereFilterOp;
  value: any;

  constructor(
    field: string,
    operator: FirebaseFirestore.WhereFilterOp,
    value: string
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}
