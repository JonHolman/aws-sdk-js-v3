// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListPlacementsCommand,
  ListPlacementsCommandInput,
  ListPlacementsCommandOutput,
} from "../commands/ListPlacementsCommand";
import { IoT1ClickProjectsClient } from "../IoT1ClickProjectsClient";
import { IoT1ClickProjectsPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: IoT1ClickProjectsClient,
  input: ListPlacementsCommandInput,
  ...args: any
): Promise<ListPlacementsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListPlacementsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListPlacements(
  config: IoT1ClickProjectsPaginationConfiguration,
  input: ListPlacementsCommandInput,
  ...additionalArguments: any
): Paginator<ListPlacementsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListPlacementsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof IoT1ClickProjectsClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected IoT1ClickProjects | IoT1ClickProjectsClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
