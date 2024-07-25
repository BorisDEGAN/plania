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

    scopes: yup.array().of(
        yup.object().shape({
            intervention_zone: yup.string(),
            male_beneficiary: yup.number().integer(),
            female_beneficiary: yup.number().integer(),
            total_beneficiary: yup.number().integer(),
        })
    ),

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

    acquisition_plan: yup.array().of(
        yup.object().shape({
            period: yup.object().shape({
                from: yup.string(),
                to: yup.string(),
            }),
            acquisitions: yup.array().of(
                yup.object().shape({
                    type: yup.string(),
                    quantity: yup.number().integer(),
                    unit_price: yup.number(),
                    total_price: yup.number(),
                })
            ),
        })
    ),

    infrastructures_plan: yup.array().of(
        yup.object().shape({
            locality: yup.string(),
            type: yup.string(),
            period: yup.object().shape({
                from: yup.string(),
                to: yup.string(),
            }),
            cost: yup.number(),
            description: yup.string(),
        })
    ),

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
                        target: yup.string(),
                        baseline: yup.array().of(yup.string()),
                        data_souces: yup.array().of(yup.string()),
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
                    unit: yup.string(),
                    frequency: yup.string(),
                    quantity: yup.number().integer(),
                    unit_price: yup.number(),
                    amount: yup.number(),
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
                            from: yup.string(),
                            to: yup.string(),
                        })
                    ),
                })
            ),
        })
    ),

    created_at: yup.string(),
}); 

export default projectSchema;
