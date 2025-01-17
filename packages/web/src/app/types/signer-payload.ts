/* eslint-disable max-classes-per-file */

import { KeyringPair$Meta, KeyringPair$Json } from '@polkadot/keyring/types';
import { HexString } from '@polkadot/util/types';
import { IsEnum, IsOptional } from 'class-validator';
import {
  SignerPayloadJSON,
  SignerPayloadRaw,
} from '@polkadot/types/types/extrinsic';
import { ApiProperty } from '@nestjs/swagger';
import { SignatureType } from '@unique-nft/sdk/types';
import {
  Account,
  GenerateAccountArguments,
  GetAccountArguments,
} from '@unique-nft/sdk/sign';
import { ValidMnemonic } from '../validation';

export class GenerateAccountBody implements GenerateAccountArguments {
  @IsOptional()
  password?: string;

  @IsEnum(SignatureType)
  @IsOptional()
  pairType?: SignatureType;

  @IsOptional()
  meta?: KeyringPair$Meta;
}
export class GetAccountQuery
  extends GenerateAccountBody
  implements GetAccountArguments
{
  @ValidMnemonic()
  mnemonic: string;
}

export class AccountResponse implements Account {
  mnemonic: string;

  seed: HexString;

  publicKey: HexString;

  keyfile: KeyringPair$Json;
}

export class SignerPayloadJSONDto implements SignerPayloadJSON {
  @ApiProperty({
    description: 'The ss-58 encoded address',
    example: 'yGCyN3eydMkze4EPtz59Tn7obwbUbYNZCz48dp8FRdemTaLwm',
  })
  address: string;

  @ApiProperty({
    description: 'The checkpoint hash of the block, in hex',
  })
  blockHash: string;

  @ApiProperty({
    description: 'The checkpoint block number, in hex',
  })
  blockNumber: string;

  @ApiProperty({
    description: 'The era for this transaction, in hex',
  })
  era: string;

  @ApiProperty({
    description: 'The genesis hash of the chain, in hex',
  })
  genesisHash: string;

  @ApiProperty({
    description: 'The encoded method (with arguments) in hex',
  })
  method: string;

  @ApiProperty({
    description: 'The nonce for this transaction, in hex',
  })
  nonce: string;

  @ApiProperty({
    description: 'The current spec version for the runtime',
  })
  specVersion: string;

  @ApiProperty({
    description: 'The tip for this transaction, in hex',
  })
  tip: string;

  @ApiProperty({
    description: 'The current transaction version for the runtime',
  })
  transactionVersion: string;

  @ApiProperty({
    description: 'The applicable signed extensions for this runtime',
  })
  signedExtensions: string[];

  @ApiProperty({
    description: 'The version of the extrinsic we are dealing with',
  })
  version: number;
}

export class SignerPayloadRawDto implements SignerPayloadRaw {
  @ApiProperty({
    description: 'The ss-58 encoded address',
    example: 'yGCyN3eydMkze4EPtz59Tn7obwbUbYNZCz48dp8FRdemTaLwm',
  })
  address: string;

  @ApiProperty({
    description: 'The hex-encoded data for this request',
  })
  data: string;

  @ApiProperty({
    enum: ['bytes', 'payload'],
    description: 'The type of the contained data',
  })
  type: 'bytes' | 'payload';
}
