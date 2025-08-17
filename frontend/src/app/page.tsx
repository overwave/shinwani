"use client";

import {Col, Container, Placeholder, Row} from "react-bootstrap";
import Navbar from "./components/navbar/Navbar";
import Error from "@/app/components/error/Error";
import {CourseType} from "@/app/services/types";
import LearnPlaceholder from "@/app/components/learn-placeholder/LearnPlaceholder";
import Lessons from "@/app/components/lessons/Lessons";
import Reviews from "@/app/components/reviews/Reviews";
import {useBunproSummary, useUser, useWanikaniSummary} from "@/app/services/hooks";

export default function HomePage() {
    const {data: user, isLoading: userLoading, error: userError} = useUser();
    const summaries = {
        "wanikani": useWanikaniSummary(userLoading),
        "bunpro": useBunproSummary(userLoading),
    }

    const getCoursePlaceholder = () => (
        <Col md={12}>
            <div className="p-3">
                <Placeholder as="h3" animation="glow" className="mb-3">
                    <Placeholder lg={2} xs={4} className="rounded-1"/>
                </Placeholder>
                <Row className="g-3">
                    <Col md={6}><LearnPlaceholder/></Col>
                    <Col md={6}><LearnPlaceholder/></Col>
                </Row>
            </div>
        </Col>
    );

    function getCourseCard(course: CourseType) {
        if (!user?.courses[course]) return <></>;
        if (summaries[course].error) return <Error/>;
        const summary = summaries[course].data;
        return <Col md={12}>
            <div className="p-3">
                <h3 className="mb-3">
                    {course == "wanikani" && "Wanikani"}
                    {course == "bunpro" && "Bunpro"}
                </h3>
                <Row className="g-3">
                    <Col md={6}>
                        {summary ?
                            <Lessons lessons={summary.lessons} type={course}/> :
                            <LearnPlaceholder/>}
                    </Col>
                    <Col md={6}>
                        {summary ?
                            <Reviews reviews={summary.reviews} heap={summary.heap} type={course}/> :
                            <LearnPlaceholder/>}
                    </Col>
                </Row>
            </div>
        </Col>;
    }

    function getContainerContent() {
        if (userLoading) {
            return getCoursePlaceholder();
        } else if (userError) {
            return <Error text="Failed to load configured courses. Please try refreshing the page."/>;
        }
        return (
            <>
                {getCourseCard("wanikani")}
                {getCourseCard("bunpro")}
            </>
        );
    }

    return (
        <>
            <Navbar/>
            <Container className="mt-4">
                <Row className="g-4">
                    {getContainerContent()}
                </Row>
            </Container>
        </>
    );
}
