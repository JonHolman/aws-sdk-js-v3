// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  GetFaceSearchCommand,
  GetFaceSearchCommandInput,
  GetFaceSearchCommandOutput,
} from "../commands/GetFaceSearchCommand";
import { RekognitionClient } from "../RekognitionClient";
import { RekognitionPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: GetFaceSearchCommandInput,
  ...args: any
): Promise<GetFaceSearchCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetFaceSearchCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateGetFaceSearch(
  config: RekognitionPaginationConfiguration,
  input: GetFaceSearchCommandInput,
  ...additionalArguments: any
): Paginator<GetFaceSearchCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetFaceSearchCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof RekognitionClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Rekognition | RekognitionClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
