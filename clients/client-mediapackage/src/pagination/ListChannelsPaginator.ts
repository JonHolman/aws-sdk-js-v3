// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListChannelsCommand,
  ListChannelsCommandInput,
  ListChannelsCommandOutput,
} from "../commands/ListChannelsCommand";
import { MediaPackageClient } from "../MediaPackageClient";
import { MediaPackagePaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: MediaPackageClient,
  input: ListChannelsCommandInput,
  ...args: any
): Promise<ListChannelsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListChannelsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListChannels(
  config: MediaPackagePaginationConfiguration,
  input: ListChannelsCommandInput,
  ...additionalArguments: any
): Paginator<ListChannelsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListChannelsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof MediaPackageClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected MediaPackage | MediaPackageClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
