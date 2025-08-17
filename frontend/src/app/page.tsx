"use client";

import {Col, Container, Row, Spinner} from "react-bootstrap";
import Navbar from "./components/navbar/Navbar";
import {useCourseCounts as useCounts, useUser} from "./services";
import Error from "@/app/components/error/Error";
import Lessons from "@/app/components/lessons/Lessons";
import Reviews from "@/app/components/reviews/Reviews";
import {CourseType} from "@/app/services/types";

export default function HomePage() {
    const {data: user, isLoading: userLoading, error: userError} = useUser();
    const {data: counts, isLoading: countLoading} = useCounts(userLoading);

    function getCourseCard(course: CourseType) {
        if (!user?.courses[course]) return <></>;
        const courseCounts = counts?.[course];
        return <Col md={12}>
            <div className="p-3">
                <h3 className="mb-3">
                    {course == "wanikani" && "Wanikani"}
                    {course == "bunpro" && "Bunpro"}
                </h3>
                {countLoading && <div className="text-center py-4"><Spinner animation="border" role="status"/></div>}
                {courseCounts &&
                    <Row className="g-3">
                        <Col md={6}>
                            <Lessons lessons={courseCounts.lessons} type={course}/>
                        </Col>
                        <Col md={6}>
                            <Reviews reviews={courseCounts.reviews} heap={courseCounts.heap} type={course}/>
                        </Col>
                    </Row>}
            </div>
        </Col>;
    }

    function getContainerContent() {
        if (userLoading) {
            return (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status"/>
                </div>
            );
        } else if (userError) {
            return <Error text="Failed to load configured courses. Please try refreshing the page."/>;
        }
        if (user) {
            return <>
                {getCourseCard("wanikani")}
                {getCourseCard("bunpro")}
                {
                    user.courses.bunpro &&
                    <Col md={12}>
                        <div className="p-3">
                            <h3 className="mb-3">Bunpro</h3>
                            {countLoading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status"/>
                                </div>
                            ) : (
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Lessons lessons={counts?.bunpro?.lessons || 0} type="bunpro"/>
                                    </Col>
                                    <Col md={6}>
                                        <Reviews reviews={counts?.bunpro?.reviews || 0}
                                                 heap={counts?.bunpro?.heap || 0}
                                                 type="bunpro"/>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                }
            </>
        }
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
