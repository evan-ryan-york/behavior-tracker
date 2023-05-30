import { ObservationRecord } from "../types/types";

export const getAntecedentsByBehavior = (observations: ObservationRecord[], behavior: string) => {
  const filteredObservations = observations.filter((observation) =>
    observation.behaviors.includes(behavior)
  );
  const antecedents: string[] = [];
  filteredObservations.forEach((observation) => {
    antecedents.push(...observation.antecedents);
  });
  return antecedents;
};

export const getConsequencesByBehavior = (observations: ObservationRecord[], behavior: string) => {
  const filteredObservations = observations.filter((observation) =>
    observation.behaviors.includes(behavior)
  );
  const consequences: string[] = [];
  filteredObservations.forEach((observation) => {
    consequences.push(...observation.consequences);
  });
  return consequences;
};

export const getFunctionsOfBehaviorByBehavior = (
  observations: ObservationRecord[],
  behavior: string
) => {
  const filteredObservations = observations.filter((observation) =>
    observation.behaviors.includes(behavior)
  );
  const functionsOfBehavior: string[] = [];
  filteredObservations.forEach((observation) => {
    functionsOfBehavior.push(...observation.functionsOfBehavior);
  });
  return functionsOfBehavior;
};
