import * as yup from "yup";

export const ProjectSchemaValidation = yup.object().shape({
    title: yup.string().required(),
    overview: yup.string().nullable(),
    context: yup.string().nullable(),
    justification: yup.string().nullable(),
    description: yup.string().nullable(),
    duration: yup.number().nullable().integer(),
    global_objective: yup.string().nullable(),

    objectives: yup.array().of(yup.string().required()).required(),

    outcomes: yup.array().of(
        yup.object().shape({
            title: yup.string().required(),
            activities: yup.array().of(yup.string().required()).required(),
        })
    ).required(),

    logical_context: yup.object().shape({
        budget: yup.number().required(),
        budget_currency: yup.string().nullable(),
        objectives: yup.array().of(yup.string().nullable()),
        outcomes: yup.array().of(
            yup.object().shape({
                title: yup.string().required(),
                impacts: yup.array().of(yup.string().required()).required(),
                intermediate_outcomes: yup.array().of(yup.string().required()).required(),
                immediate_outcomes: yup.array().of(yup.string().required()).required(),
                activities: yup.array().of(
                    yup.object().shape({
                        title: yup.string().required(),
                        effects: yup.array().of(yup.string().required()).required(),
                    })
                ).required(),
            })
        ).required(),
    }).required(),

    intervention_strategies: yup.array().of(yup.string().required()).nullable(),

    partners: yup.array().of(
        yup.object().shape({
            name: yup.string().required(),
            abilities: yup.array().of(yup.string().required()).required(),
        })
    ).required(),

    quality_monitoring: yup.array().of(yup.string().nullable()),

    performance_matrix: yup.array().of(
        yup.object().shape({
            analyse: yup.string().required(),
            effect: yup.string().required(),
            frequency: yup.string().required(),
            collect_tools: yup.array().of(yup.string().required()).required(),
            verification_sources: yup.array().of(yup.string().required()).required(),
        })
    ).nullable(),

    budget_plan: yup.array().of(
        yup.object().shape({
            section: yup.string().required(),
            activities: yup.array().of(
                yup.object().shape({
                    title: yup.string().required(),
                    budget: yup.number().required(),
                })
            ).required(),
        })
    ).nullable(),

    calendar: yup.array().of(
        yup.object().shape({
            outcome: yup.string().required(),
            activities: yup.array().of(
                yup.object().shape({
                    title: yup.string().required(),
                    start_date: yup.date().required(),
                    end_date: yup.date().required(),
                })
            ).required(),
        })
    ).nullable(),
})