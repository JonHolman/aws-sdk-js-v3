// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListLocationsCommand,
  ListLocationsCommandInput,
  ListLocationsCommandOutput,
} from "../commands/ListLocationsCommand";
import { DataSyncClient } from "../DataSyncClient";
import { DataSyncPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: DataSyncClient,
  input: ListLocationsCommandInput,
  ...args: any
): Promise<ListLocationsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListLocationsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListLocations(
  config: DataSyncPaginationConfiguration,
  input: ListLocationsCommandInput,
  ...additionalArguments: any
): Paginator<ListLocationsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListLocationsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof DataSyncClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected DataSync | DataSyncClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
