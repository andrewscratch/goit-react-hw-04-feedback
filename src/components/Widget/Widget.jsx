import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  WrapperWidget,
  WrapperButton,
  WrapperStatistics,
} from './Widget.styled';
import { FeedbackOptions } from '../FeedbackOptions';
import { Statistics } from '../Statistics';
import { Box } from '../../utils/Box';
import { theme } from '../../utils/theme';

export function Widget({ initialGood, initialNeutral, initialBad }) {
  const [good, setGood] = useState(initialGood);
  const [neutral, setNeutral] = useState(initialNeutral);
  const [bad, setBad] = useState(initialBad);

  const changeState = state => state + 1;

  const onLeaveFeedback = evt => {
    switch (evt.target.name) {
      case 'good':
        setGood(changeState);
        break;
      case 'neutral':
        setNeutral(changeState);
        break;
      case 'bad':
        setBad(changeState);
        break;
      default:
        return;
    }
  };

  return (
    <WrapperWidget>
      <Box
        fontSize={theme.typography.heading}
        pt={4}
        pb={3}
        m={0}
        color={theme.colors.heading}
        as="h2"
      >
        Please leave feedback
      </Box>
      <WrapperButton>
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={onLeaveFeedback}
        />
      </WrapperButton>
      <Box
        fontSize={theme.typography.heading}
        m={0}
        mb={3}
        color={theme.colors.heading}
        as="h2"
      >
        Statistics
      </Box>
      <WrapperStatistics>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={good + neutral + bad}
          positivePercentage={Math.round((good / (good + neutral + bad)) * 100)}
        />
      </WrapperStatistics>
    </WrapperWidget>
  );
}

Widget.propTypes = {
  initialGood: PropTypes.number.isRequired,
  initialNeutral: PropTypes.number.isRequired,
  initialBad: PropTypes.number.isRequired,
};