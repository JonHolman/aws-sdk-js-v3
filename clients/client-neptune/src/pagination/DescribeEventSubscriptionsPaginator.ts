// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  DescribeEventSubscriptionsCommand,
  DescribeEventSubscriptionsCommandInput,
  DescribeEventSubscriptionsCommandOutput,
} from "../commands/DescribeEventSubscriptionsCommand";
import { NeptuneClient } from "../NeptuneClient";
import { NeptunePaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: NeptuneClient,
  input: DescribeEventSubscriptionsCommandInput,
  ...args: any
): Promise<DescribeEventSubscriptionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeEventSubscriptionsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateDescribeEventSubscriptions(
  config: NeptunePaginationConfiguration,
  input: DescribeEventSubscriptionsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeEventSubscriptionsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.Marker
  let token: typeof input.Marker | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeEventSubscriptionsCommandOutput;
  while (hasNext) {
    input.Marker = token;
    input["MaxRecords"] = config.pageSize;
    if (config.client instanceof NeptuneClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Neptune | NeptuneClient");
    }
    yield page;
    const prevToken = token;
    token = page.Marker;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
