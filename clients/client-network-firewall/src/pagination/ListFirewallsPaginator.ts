// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListFirewallsCommand,
  ListFirewallsCommandInput,
  ListFirewallsCommandOutput,
} from "../commands/ListFirewallsCommand";
import { NetworkFirewallClient } from "../NetworkFirewallClient";
import { NetworkFirewallPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: NetworkFirewallClient,
  input: ListFirewallsCommandInput,
  ...args: any
): Promise<ListFirewallsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListFirewallsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListFirewalls(
  config: NetworkFirewallPaginationConfiguration,
  input: ListFirewallsCommandInput,
  ...additionalArguments: any
): Paginator<ListFirewallsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListFirewallsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof NetworkFirewallClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected NetworkFirewall | NetworkFirewallClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
