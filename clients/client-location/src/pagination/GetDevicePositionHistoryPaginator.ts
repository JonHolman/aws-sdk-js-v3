// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  GetDevicePositionHistoryCommand,
  GetDevicePositionHistoryCommandInput,
  GetDevicePositionHistoryCommandOutput,
} from "../commands/GetDevicePositionHistoryCommand";
import { LocationClient } from "../LocationClient";
import { LocationPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: LocationClient,
  input: GetDevicePositionHistoryCommandInput,
  ...args: any
): Promise<GetDevicePositionHistoryCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetDevicePositionHistoryCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateGetDevicePositionHistory(
  config: LocationPaginationConfiguration,
  input: GetDevicePositionHistoryCommandInput,
  ...additionalArguments: any
): Paginator<GetDevicePositionHistoryCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetDevicePositionHistoryCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof LocationClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Location | LocationClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
