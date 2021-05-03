import { FilterPatternByViewStrategy } from "../filter-algorithms/FilterPatternByViewStrategy";
import { FilterIntervalStrategy } from "../filter-algorithms/FilterIntervalStrategy";
import { FilterSearchBarStrategy } from "./FilterSearchBarStrategy";
import { FilterOnMapStrategy } from "./FilterOnMapStrategy";
import { FilterResourceByViewStrategy } from "./FilterResourceByViewStrategy";
import { FilterTimeIntervalStrategy } from "./FilterTimeIntervalStrategy";
import { FilterResourceByPropertyStrategy } from "./FilterResourceByPropertyStrategy";
import { FilterPatternStrategy } from "./FilterPatternStrategy";
import { FilterLocationTypeStrategy } from "./FilterLocationTypeStrategy";
import { FilterStartTimeStrategy } from "./FilterStartTimeStrategy";
import { FilterEndTimeStrategy } from "./FilterEndTimeStrategy";
import { FilterMaxValueStrategy } from "./FilterMaxValueStrategy";
import { FilterMinValueStrategy } from "./FilterMinValueStrategy";

// we use this class
// when unserializing strategy by session storage
// using reflection
export class FilterStrategyFactory {
    static make(strategyDTO) {
        switch (strategyDTO.class) {
            case "FilterPatternByViewStrategy":
                return FilterPatternByViewStrategy.create({
                    ...strategyDTO,
                });
            case "FilterIntervalStrategy":
                return FilterIntervalStrategy.create({
                    ...strategyDTO,
                });
            case "FilterOnMapStrategy":
                return FilterOnMapStrategy.create({
                    ...strategyDTO,
                });
            case "FilterSearchBarStrategy":
                return FilterSearchBarStrategy.create({
                    ...strategyDTO,
                });
            case "FilterTimeIntervalStrategy":
                return FilterTimeIntervalStrategy.create({
                    ...strategyDTO,
                });
            case "FilterResourceByViewStrategy":
                return FilterResourceByViewStrategy.create({
                    ...strategyDTO,
                });
            case "FilterResourceByPropertyStrategy":
                return FilterResourceByPropertyStrategy.create({
                    ...strategyDTO,
                });
            case "FilterPatternStrategy":
                return FilterPatternStrategy.create({ ...strategyDTO });
            case "FilterLocationTypeStrategy":
                return FilterLocationTypeStrategy.create({ ...strategyDTO });
            case "FilterStartTimeStrategy":
                return FilterStartTimeStrategy.create({ ...strategyDTO });
            case "FilterEndTimeStrategy":
                return FilterEndTimeStrategy.create({ ...strategyDTO });
            case "FilterMaxValueStrategy":
                return FilterMaxValueStrategy.create({ ...strategyDTO });
            case "FilterMinValueStrategy":
                return FilterMinValueStrategy.create({ ...strategyDTO });
        }
        return undefined;
    }
}
