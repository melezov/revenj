import * as React from 'react';

import { Numeric } from '../../util/NumberUtils/NumberUtils';
import { IExternalFormField } from '../Form/FormField';
import { Validator } from '../validation';

export interface IFields {
  // Minimal set of components needed to cover all the DSL types
  Checkbox: React.ComponentType<IExternalFormField<any, any, boolean>>;
  Currency: React.ComponentType<IExternalFormField<any, any, MoneyStr>>;
  DatePicker: React.ComponentType<IExternalFormField<any, any, DateStr>>;
  DateTimePicker: React.ComponentType<IExternalFormField<any, any, TimestampStr>>;
  Link: React.ComponentType<IExternalFormField<any, any, string>>;
  Number: React.ComponentType<IExternalFormField<any, any, Numeric>>;
  Select: React.ComponentType<IExternalFormField<any, any, any>>;
  Multiselect: React.ComponentType<IExternalFormField<any, any, any[]>>;
  S3FileInput: React.ComponentType<IExternalFormField<any, any, S3>>;
  ShortText: React.ComponentType<IExternalFormField<any, any, string>>;
  Text: React.ComponentType<IExternalFormField<any, any, string>>;
  Textarea: React.ComponentType<IExternalFormField<any, any, TextStr>>;

  // Any additional components
  [key: string]: React.ComponentType<IExternalFormField<any, any, any>>;
}

// NOTE: This is not typesafe, unfortunately. It would be nice to figure out a way to constrain these in some way, otherwise
// it will be possible for the generated code to produce some weird results. This is not a problem per se, since we can make
// sure the generated code generally makes sense, but user-defined defaults and validators might be wonky
export interface IFieldRegistryContext {
  Fields: IFields;
  validators: { [key: string]: Validator<any, any, any> | ((...args: any[]) => Validator<any, any, any>) };
  defaults: { [key: string]: any };
}

const ImplementationMissing: React.FC<IExternalFormField<any, any, any>> = () => {
  throw new Error('Implementation missing!');
};

const defaultContext: IFieldRegistryContext = {
  Fields: {
    Checkbox: ImplementationMissing,
    Currency: ImplementationMissing,
    DatePicker: ImplementationMissing,
    DateTimePicker: ImplementationMissing,
    Link: ImplementationMissing,
    Number: ImplementationMissing,
    Select: ImplementationMissing,
    Multiselect: ImplementationMissing,
    S3FileInput: ImplementationMissing,
    ShortText: ImplementationMissing,
    Text: ImplementationMissing,
    Textarea: ImplementationMissing,
  },
  defaults: {},
  validators: {},
};

export const FieldRegistryContext = React.createContext<IFieldRegistryContext>(defaultContext);
