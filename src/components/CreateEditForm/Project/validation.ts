import * as yup from 'yup';

const ProjectSchemaValidation = yup.object().shape({
    title: yup.string().max(255).nullable(),
    overview: yup.string().nullable(),
    context: yup.string().nullable(),
    justification: yup.string().nullable(),
    description: yup.string().nullable(),
    global_objective: yup.string().nullable(),

    objectives: yup.array().of(yup.string().nullable()),

    duration: yup.number().positive().nullable(),
    budget: yup.string().nullable(),
    budget_currency: yup.string().nullable(),

    logical_context: yup.object().shape({
        impacts: yup.array().of(yup.string().nullable()),
        intermediate_outcomes: yup.array().of(
            yup.object().shape({
                title: yup.string().nullable(),
                immediate_outcomes: yup.array().of(
                    yup.object().shape({
                        title: yup.string().nullable(),
                        activities: yup.array().of(
                            yup.object().shape({
                                title: yup.string().nullable(),
                                effect: yup.string().nullable(),
                            })
                        ),
                    })
                ),
            })
        ),
    }).nullable(),

    intervention_strategies: yup.array().of(yup.string().nullable()),

    partners: yup.array().of(
        yup.object().shape({
            name: yup.string().nullable(),
            managment_levels: yup.array().of(
                yup.object().shape({
                    title: yup.string().nullable(),
                    level: yup.string().nullable(),
                    stakeholders: yup.array().of(
                        yup.object().shape({
                            name: yup.array().of(yup.string().nullable()),
                            abilities: yup.array().of(yup.string().nullable()),
                        })
                    ),
                })
            ),
        })
    ).nullable(),

    quality_monitoring: yup.array().of(yup.string().nullable()),

    performance_matrix: yup.array().of(
        yup.object().shape({
            effect: yup.string().nullable(),
            verification_sources: yup.array().of(yup.string().nullable()),
            collect_tools: yup.array().of(yup.string().nullable()),
            frequency: yup.string().nullable(),
            analyse: yup.string().nullable(),
        })
    ).nullable(),

    budget_plan: yup.array().of(
        yup.object().shape({
            section: yup.string().nullable(),
            activities: yup.array().of(
                yup.object().shape({
                    title: yup.string().nullable(),
                    budget: yup.number().positive().nullable(),
                })
            ),
        })
    ).nullable(),

    calendar: yup.array().of(
        yup.object().shape({
            outcome: yup.string().nullable(),
            activities: yup.array().of(
                yup.object().shape({
                    title: yup.string().nullable(),
                    start_date: yup.date().nullable(),
                    end_date: yup.date().nullable(),
                })
            ),
        })
    ).nullable(),
});

export default ProjectSchemaValidation;
