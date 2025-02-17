// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import { BackupClient } from "../BackupClient";
import {
  ListRecoveryPointsByBackupVaultCommand,
  ListRecoveryPointsByBackupVaultCommandInput,
  ListRecoveryPointsByBackupVaultCommandOutput,
} from "../commands/ListRecoveryPointsByBackupVaultCommand";
import { BackupPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: BackupClient,
  input: ListRecoveryPointsByBackupVaultCommandInput,
  ...args: any
): Promise<ListRecoveryPointsByBackupVaultCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListRecoveryPointsByBackupVaultCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListRecoveryPointsByBackupVault(
  config: BackupPaginationConfiguration,
  input: ListRecoveryPointsByBackupVaultCommandInput,
  ...additionalArguments: any
): Paginator<ListRecoveryPointsByBackupVaultCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListRecoveryPointsByBackupVaultCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof BackupClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Backup | BackupClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
