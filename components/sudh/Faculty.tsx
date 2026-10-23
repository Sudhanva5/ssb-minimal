import './faculty.css';
import { CardRail, PersonCard } from './CardRail';
import { faculty, mentors } from './facultyData';
import { PeopleSection } from './facultyHead';

/** v3's faculty, as two rows of cards that move only when you move them. */
export function Faculty() {
  return (
    <PeopleSection
      id="faculty"
      eyebrow="Faculty"
      title="Learn From Your Future Recruiters, Not Just Faculty."
      lede="Operators and leaders from BCG, McKinsey, Razorpay, Zomato, PayPal, Flipkart and more teach at SSB."
    >
      <div className="pt-panel">
        <CardRail label="Faculty">
          {faculty.map((f) => (
            <PersonCard key={f.name} photo={f.photo} name={f.name} title={f.course} by={`by ${f.name}`} detail={f.credentials} orgs={[f.org]} />
          ))}
        </CardRail>
      </div>
    </PeopleSection>
  );
}

/** v3's mentors, in the same two-row rail: each founder with their two companies. */
export function Mentors() {
  return (
    <PeopleSection
      id="mentors"
      eyebrow="Mentors"
      title="Mentored by the Builders of Zomato, Flipkart, Paytm and CRED"
      lede="Founders and investors behind some of India’s best-known companies mentor SSB students."
    >
      <div className="pt-panel">
        <CardRail label="Mentors">
          {mentors.map((m) => (
            <PersonCard key={m.name} photo={m.photo} name={m.name} title={m.name} by={m.role} orgs={m.orgs} />
          ))}
        </CardRail>
      </div>
    </PeopleSection>
  );
}
