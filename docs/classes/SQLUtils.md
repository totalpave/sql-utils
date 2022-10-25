[@totalpave/sql-utils - v1.0.3](../README.md) / [Exports](../modules.md) / SQLUtils

# Class: SQLUtils

## Table of contents

### Methods

- [castToBoolean](SQLUtils.md#casttoboolean)
- [toDatetime](SQLUtils.md#todatetime)

## Methods

### castToBoolean

▸ `Static` **castToBoolean**(`value`): `boolean`

Takes an SQLBoolean (0, 1, "0", or "1") and converts it to a boolean true or boolean false value.

If the given value is not an SQLBoolean, then no cast is done.
If the given value is null/undefined, then null is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`SQLBoolean`](../modules.md#sqlboolean) |

#### Returns

`boolean`

#### Defined in

[SQLUtils.ts:49](https://github.com/totalpave/sql-utils/blob/d0093d9/src/SQLUtils.ts#L49)

___

### toDatetime

▸ `Static` **toDatetime**(`date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`string`

#### Defined in

[SQLUtils.ts:5](https://github.com/totalpave/sql-utils/blob/d0093d9/src/SQLUtils.ts#L5)
