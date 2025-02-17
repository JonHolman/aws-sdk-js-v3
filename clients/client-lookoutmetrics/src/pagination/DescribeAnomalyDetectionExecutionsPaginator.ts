// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  DescribeAnomalyDetectionExecutionsCommand,
  DescribeAnomalyDetectionExecutionsCommandInput,
  DescribeAnomalyDetectionExecutionsCommandOutput,
} from "../commands/DescribeAnomalyDetectionExecutionsCommand";
import { LookoutMetricsClient } from "../LookoutMetricsClient";
import { LookoutMetricsPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: LookoutMetricsClient,
  input: DescribeAnomalyDetectionExecutionsCommandInput,
  ...args: any
): Promise<DescribeAnomalyDetectionExecutionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeAnomalyDetectionExecutionsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateDescribeAnomalyDetectionExecutions(
  config: LookoutMetricsPaginationConfiguration,
  input: DescribeAnomalyDetectionExecutionsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeAnomalyDetectionExecutionsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeAnomalyDetectionExecutionsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof LookoutMetricsClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected LookoutMetrics | LookoutMetricsClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
