import * as yup from 'yup';

const projectSchema = yup.object().shape({
    id: yup.mixed(),
    title: yup.string(),
    overview: yup.string(),
    context: yup.string(),
    justification: yup.string(),
    description: yup.string(),
    global_objective: yup.string(),

    objectives: yup.array().of(yup.string()),

    duration: yup.number(),
    budget: yup.string(),
    budget_currency: yup.string(),

    logical_context: yup.object().shape({
        impact: yup.string(),
        intermediate_outcomes: yup.array().of(
            yup.object().shape({
                title: yup.string(),
                immediate_outcomes: yup.array().of(
                    yup.object().shape({
                        title: yup.string(),
                        activities: yup.array().of(
                            yup.object().shape({
                                title: yup.string(),
                                effect: yup.string(),
                            })
                        ),
                    })
                ),
            })
        ),
    }),

    intervention_strategies: yup.array().of(yup.string()),

    partners: yup.array().of(
        yup.object().shape({
            managment_levels: yup.array().of(
                yup.object().shape({
                    title: yup.string(),
                    level: yup.string(),
                    stakeholders: yup.array().of(
                        yup.object().shape({
                            name: yup.array().of(yup.string()),
                            abilities: yup.array().of(yup.string()),
                        })
                    ),
                })
            ),
        })
    ),

    quality_monitoring: yup.array().of(yup.string()),

    performance_matrix: yup.array().of(
        yup.object().shape({
            outcome: yup.string(),
            indicateur: yup.array().of(
                yup.object().shape({
                    title: yup.string(),
                    props: yup.object().shape({
                        baseline: yup.array().of(yup.string()),
                        data_souces: yup.array().of(yup.string()),
                        target: yup.string(),
                        managers: yup.array().of(yup.string()),
                        collect_tools: yup.array().of(yup.string()),
                        frequency: yup.array().of(yup.string()),
                    }),
                })
            ),
        })
    ),

    budget_plan: yup.array().of(
        yup.object().shape({
            section: yup.string(),
            activities: yup.array().of(
                yup.object().shape({
                    title: yup.string(),
                    budget: yup.number(),
                })
            ),
        })
    ),

    calendar: yup.array().of(
        yup.object().shape({
            outcome: yup.string(),
            activities: yup.array().of(
                yup.object().shape({
                    title: yup.string(),
                    period: yup.array().of(
                        yup.object().shape({
                            start_date: yup.string(),
                            end_date: yup.string(),
                        })
                    ),
                })
            ),
        })
    ),

    created_at: yup.string(),
});

export default projectSchema;
