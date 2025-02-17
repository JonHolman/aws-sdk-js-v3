// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListResourceSharePermissionsCommand,
  ListResourceSharePermissionsCommandInput,
  ListResourceSharePermissionsCommandOutput,
} from "../commands/ListResourceSharePermissionsCommand";
import { RAMClient } from "../RAMClient";
import { RAMPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: RAMClient,
  input: ListResourceSharePermissionsCommandInput,
  ...args: any
): Promise<ListResourceSharePermissionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListResourceSharePermissionsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListResourceSharePermissions(
  config: RAMPaginationConfiguration,
  input: ListResourceSharePermissionsCommandInput,
  ...additionalArguments: any
): Paginator<ListResourceSharePermissionsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListResourceSharePermissionsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof RAMClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected RAM | RAMClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
