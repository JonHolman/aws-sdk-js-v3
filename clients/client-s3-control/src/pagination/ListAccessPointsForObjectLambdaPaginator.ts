// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListAccessPointsForObjectLambdaCommand,
  ListAccessPointsForObjectLambdaCommandInput,
  ListAccessPointsForObjectLambdaCommandOutput,
} from "../commands/ListAccessPointsForObjectLambdaCommand";
import { S3ControlClient } from "../S3ControlClient";
import { S3ControlPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: S3ControlClient,
  input: ListAccessPointsForObjectLambdaCommandInput,
  ...args: any
): Promise<ListAccessPointsForObjectLambdaCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListAccessPointsForObjectLambdaCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListAccessPointsForObjectLambda(
  config: S3ControlPaginationConfiguration,
  input: ListAccessPointsForObjectLambdaCommandInput,
  ...additionalArguments: any
): Paginator<ListAccessPointsForObjectLambdaCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListAccessPointsForObjectLambdaCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof S3ControlClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected S3Control | S3ControlClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
